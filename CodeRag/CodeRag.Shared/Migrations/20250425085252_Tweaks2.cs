using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class Tweaks2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GitHubToken",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "PathSearchRecursive",
                table: "ProjectSources",
                newName: "Recursive");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Recursive",
                table: "ProjectSources",
                newName: "PathSearchRecursive");

            migrationBuilder.AddColumn<string>(
                name: "GitHubToken",
                table: "Projects",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
