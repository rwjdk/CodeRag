using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class RemovedVectorTableFromEfCore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "vector_sources");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "vector_sources",
                columns: table => new
                {
                    VectorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataType = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    Id = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Kind = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Namespace = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Parent = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    ParentKind = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SourceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SourcePath = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeOfIngestion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Vector = table.Column<string>(type: "vector(1536)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vector_sources", x => x.VectorId);
                });

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
    }
}
