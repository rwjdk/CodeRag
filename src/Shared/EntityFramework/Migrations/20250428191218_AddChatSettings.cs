using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class AddChatSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChatMaxNumberOfAnswersBackFromDocumentationSearch",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ChatMaxNumberOfAnswersBackFromSourceCodeSearch",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "ChatScoreShouldBeLowerThanThisInDocumentSearch",
                table: "Projects",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ChatScoreShouldBeLowerThanThisInSourceCodeSearch",
                table: "Projects",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "ChatUseDocumentationSearch",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ChatUseSourceCodeSearch",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChatMaxNumberOfAnswersBackFromDocumentationSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ChatMaxNumberOfAnswersBackFromSourceCodeSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ChatScoreShouldBeLowerThanThisInDocumentSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ChatScoreShouldBeLowerThanThisInSourceCodeSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ChatUseDocumentationSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ChatUseSourceCodeSearch",
                table: "Projects");
        }
    }
}
