using CodeRag.Abstractions;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.VectorStores;

[UsedImplicitly]
public class VectorStoreCommandSpecific : IScopedService
{
    public async Task Upsert(ProjectSourceEntity source, VectorStoreCollection<Guid, VectorEntity> collection, VectorEntity entry)
    {
        try
        {
            entry.VectorId = Guid.NewGuid();
            entry.SourceId = source.Id;

            switch (source.Kind)
            {
                case ProjectSourceKind.CSharpCode:
                    entry.DataType = nameof(VectorStoreDataType.Code);
                    break;
                case ProjectSourceKind.Markdown:
                    entry.DataType = nameof(VectorStoreDataType.Documentation);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            entry.TimeOfIngestion = DateTime.UtcNow;
            await collection.UpsertAsync(entry);
        }
        catch (Exception e)
        {
            if (e.Message.Contains("This model's maximum context length is"))
            {
                //Too big. Splitting in two recursive until content fit
                int middle = entry.Content.Length / 2;
                string? name = entry.Name;
                string part1 = entry.Content.Substring(0, middle);
                string part2 = entry.Content.Substring(middle);
                entry.Content = part1;
                entry.Name = name + $" ({Guid.NewGuid()})";
                await Upsert(source, collection, entry);
                entry.VectorId = Guid.NewGuid();
                entry.Content = part2;
                entry.Name = name + $" ({Guid.NewGuid()})";
                await Upsert(source, collection, entry);
            }
            else
            {
                Console.WriteLine($"Rate Limited. Sleeping 10 sec ({e.Message})");
                await Task.Delay(10000);
                await collection.UpsertAsync(entry);
            }
        }
    }
}