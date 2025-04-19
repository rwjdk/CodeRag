using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class Project : Migration
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
                    GitHubOwner = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    GitHubRepo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    GitHubToken = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DeveloperInstructions = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectSources",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Kind = table.Column<int>(type: "int", nullable: false),
                    Location = table.Column<int>(type: "int", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PathSearchRecursive = table.Column<bool>(type: "bit", nullable: false),
                    RootUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    MarkdownIgnoreCommentedOutContent = table.Column<bool>(type: "bit", nullable: false),
                    MarkdownIgnoreImages = table.Column<bool>(type: "bit", nullable: false),
                    MarkdownIgnoreMicrosoftLearnNoneCsharpContent = table.Column<bool>(type: "bit", nullable: false),
                    MarkdownOnlyChunkIfMoreThanThisNumberOfLines = table.Column<int>(type: "int", nullable: false),
                    MarkdownLevelsToChunk = table.Column<int>(type: "int", nullable: false),
                    MarkdownChunkIgnoreIfLessThanThisAmountOfChars = table.Column<int>(type: "int", nullable: true),
                    MarkdownFilenameEqualDocUrlSubpage = table.Column<bool>(type: "bit", nullable: false),
                    ProjectEntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectSources_Projects_ProjectEntityId",
                        column: x => x.ProjectEntityId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectSourceIgnorePatterns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Pattern = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    ProjectSourceEntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ProjectSourceEntityId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSourceIgnorePatterns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectSourceIgnorePatterns_ProjectSources_ProjectSourceEntityId",
                        column: x => x.ProjectSourceEntityId,
                        principalTable: "ProjectSources",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProjectSourceIgnorePatterns_ProjectSources_ProjectSourceEntityId1",
                        column: x => x.ProjectSourceEntityId1,
                        principalTable: "ProjectSources",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSourceIgnorePatterns_ProjectSourceEntityId",
                table: "ProjectSourceIgnorePatterns",
                column: "ProjectSourceEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSourceIgnorePatterns_ProjectSourceEntityId1",
                table: "ProjectSourceIgnorePatterns",
                column: "ProjectSourceEntityId1");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSources_ProjectEntityId",
                table: "ProjectSources",
                column: "ProjectEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectSourceIgnorePatterns");

            migrationBuilder.DropTable(
                name: "ProjectSources");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
