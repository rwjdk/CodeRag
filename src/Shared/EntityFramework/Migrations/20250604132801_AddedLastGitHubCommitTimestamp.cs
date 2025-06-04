using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeRag.Shared.Migrations
{
    /// <inheritdoc />
    public partial class AddedLastGitHubCommitTimestamp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LastGitGubCommitTimestamp",
                table: "ProjectSources",
                type: "datetimeoffset",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastGitGubCommitTimestamp",
                table: "ProjectSources");
        }
    }
}
