using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    DeveloperInstructions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GitHubOwner = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    GitHubRepo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    GitHubToken = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "vector_sources",
                columns: table => new
                {
                    VectorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Kind = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Parent = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    ParentKind = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Namespace = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SourcePath = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    TimeOfIngestion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataType = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SourceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Vector = table.Column<string>(type: "vector(1536)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vector_sources", x => x.VectorId);
                });

            migrationBuilder.CreateTable(
                name: "ProjectSources",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectEntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Kind = table.Column<int>(type: "int", nullable: false),
                    Location = table.Column<int>(type: "int", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PathSearchRecursive = table.Column<bool>(type: "bit", nullable: false),
                    RootUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    MarkdownChunkLineIgnorePatternsRaw = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileIgnorePatternsRaw = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MarkdownIgnoreCommentedOutContent = table.Column<bool>(type: "bit", nullable: false),
                    MarkdownIgnoreImages = table.Column<bool>(type: "bit", nullable: false),
                    MarkdownIgnoreMicrosoftLearnNoneCsharpContent = table.Column<bool>(type: "bit", nullable: false),
                    MarkdownOnlyChunkIfMoreThanThisNumberOfLines = table.Column<int>(type: "int", nullable: false),
                    MarkdownLevelsToChunk = table.Column<int>(type: "int", nullable: false),
                    MarkdownChunkIgnoreIfLessThanThisAmountOfChars = table.Column<int>(type: "int", nullable: false),
                    MarkdownFilenameEqualDocUrlSubpage = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectSources_Projects_ProjectEntityId",
                        column: x => x.ProjectEntityId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSources_ProjectEntityId",
                table: "ProjectSources",
                column: "ProjectEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectSources");

            migrationBuilder.DropTable(
                name: "vector_sources");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
