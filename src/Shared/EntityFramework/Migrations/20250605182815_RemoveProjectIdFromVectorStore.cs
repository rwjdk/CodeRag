using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class RemoveProjectIdFromVectorStore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_vector_sources_ProjectId",
                table: "vector_sources");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "vector_sources");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "vector_sources",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_vector_sources_ProjectId",
                table: "vector_sources",
                column: "ProjectId");
        }
    }
}
