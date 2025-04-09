using System.Runtime.CompilerServices;
using System.Text;
using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.VectorStore.Documentation;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Workbench.Components.Pages.WikiGeneration;

public partial class WikiGenerationPage(IDbContextFactory<SqlDbContext> dbContextFactory)
{
    protected override async Task OnInitializedAsync()
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();

        const string docsTableName = "debug_trellodotnet_docs";

        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Id)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.TimeOfIngestion)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Name)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Link)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Content)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Source)}] ");
        sql.AppendLine($"FROM [{docsTableName}]");
        sql.AppendLine($"WHERE [{nameof(DocumentationVectorEntity.Source)}] = {{0}}");

        FormattableString s = FormattableStringFactory.Create(sql.ToString(), "AttachmentFieldsType.md");
        var results = context.Database
            .SqlQuery<DocumentationVectorEntity>(s)
            .ToList();


        var results2 = context.Database
            .SqlQuery<DocumentationVectorEntity>(s)
            .ToList();
    }
}