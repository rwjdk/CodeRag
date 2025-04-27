using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_vector_sources_DataType",
                table: "vector_sources",
                column: "DataType");

            migrationBuilder.CreateIndex(
                name: "IX_vector_sources_ProjectId",
                table: "vector_sources",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_vector_sources_SourceId",
                table: "vector_sources",
                column: "SourceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_vector_sources_DataType",
                table: "vector_sources");

            migrationBuilder.DropIndex(
                name: "IX_vector_sources_ProjectId",
                table: "vector_sources");

            migrationBuilder.DropIndex(
                name: "IX_vector_sources_SourceId",
                table: "vector_sources");
        }
    }
}
