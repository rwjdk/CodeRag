using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class Tweaks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeveloperInstructions",
                table: "Projects",
                newName: "PullRequestReviewInstructions");

            migrationBuilder.AddColumn<string>(
                name: "CSharpXmlSummaryInstructions",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ChatInstructions",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CSharpXmlSummaryInstructions",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ChatInstructions",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "PullRequestReviewInstructions",
                table: "Projects",
                newName: "DeveloperInstructions");
        }
    }
}
