using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class AddGitHubOwnerAndRepoToSource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastGitGubCommitTimestamp",
                table: "ProjectSources",
                newName: "GitGubLastCommitTimestamp");

            migrationBuilder.AddColumn<string>(
                name: "GitHubOwner",
                table: "ProjectSources",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GitHubRepo",
                table: "ProjectSources",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GitHubOwner",
                table: "ProjectSources");

            migrationBuilder.DropColumn(
                name: "GitHubRepo",
                table: "ProjectSources");

            migrationBuilder.RenameColumn(
                name: "GitGubLastCommitTimestamp",
                table: "ProjectSources",
                newName: "LastGitGubCommitTimestamp");
        }
    }
}
