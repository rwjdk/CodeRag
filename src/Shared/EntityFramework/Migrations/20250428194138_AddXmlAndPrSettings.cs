using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class AddXmlAndPrSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PrReviewMaxNumberOfAnswersBackFromDocumentationSearch",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PrReviewMaxNumberOfAnswersBackFromSourceCodeSearch",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "PrReviewScoreShouldBeLowerThanThisInDocumentSearch",
                table: "Projects",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PrReviewScoreShouldBeLowerThanThisInSourceCodeSearch",
                table: "Projects",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "PrReviewUseDocumentationSearch",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PrReviewUseSourceCodeSearch",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "XmlSummariesMaxNumberOfAnswersBackFromDocumentationSearch",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "XmlSummariesMaxNumberOfAnswersBackFromSourceCodeSearch",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "XmlSummariesScoreShouldBeLowerThanThisInDocumentSearch",
                table: "Projects",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "XmlSummariesScoreShouldBeLowerThanThisInSourceCodeSearch",
                table: "Projects",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "XmlSummariesUseDocumentationSearch",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "XmlSummariesUseSourceCodeSearch",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrReviewMaxNumberOfAnswersBackFromDocumentationSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "PrReviewMaxNumberOfAnswersBackFromSourceCodeSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "PrReviewScoreShouldBeLowerThanThisInDocumentSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "PrReviewScoreShouldBeLowerThanThisInSourceCodeSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "PrReviewUseDocumentationSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "PrReviewUseSourceCodeSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "XmlSummariesMaxNumberOfAnswersBackFromDocumentationSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "XmlSummariesMaxNumberOfAnswersBackFromSourceCodeSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "XmlSummariesScoreShouldBeLowerThanThisInDocumentSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "XmlSummariesScoreShouldBeLowerThanThisInSourceCodeSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "XmlSummariesUseDocumentationSearch",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "XmlSummariesUseSourceCodeSearch",
                table: "Projects");
        }
    }
}
