using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class FileIgnorePatterns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileIgnorePatternsRaw",
                table: "ProjectSources");

            migrationBuilder.DropColumn(
                name: "MarkdownChunkLineIgnorePatternsRaw",
                table: "ProjectSources");

            migrationBuilder.AddColumn<string>(
                name: "FileIgnorePatterns",
                table: "ProjectSources",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MarkdownChunkLineIgnorePatterns",
                table: "ProjectSources",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileIgnorePatterns",
                table: "ProjectSources");

            migrationBuilder.DropColumn(
                name: "MarkdownChunkLineIgnorePatterns",
                table: "ProjectSources");

            migrationBuilder.AddColumn<string>(
                name: "FileIgnorePatternsRaw",
                table: "ProjectSources",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MarkdownChunkLineIgnorePatternsRaw",
                table: "ProjectSources",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
