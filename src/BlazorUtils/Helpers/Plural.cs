using System.Globalization;
using Microsoft.AspNetCore.Components;

// ReSharper disable UnusedMember.Global
// ReSharper disable MemberCanBePrivate.Global

namespace BlazorUtilities.Helpers;

public static class Plural
{
    private const string CountKeyword = "<<INT>>";
    private const string UnitKeyword = "<<CAP>>";

    // ReSharper disable once UnusedMember.Global
    public static MarkupString HoursMarkup(int count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return new MarkupString(Hours(Convert.ToDecimal(count), format));
    }

    public static MarkupString HoursMarkup(double count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return new MarkupString(Hours(Convert.ToDecimal(count), format));
    }

    private static string Hours(decimal count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return Pluralize(count, "hour", "hours", format);
    }


    public static MarkupString DaysMarkup(double count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return new MarkupString(Days(Convert.ToDecimal(count), format));
    }

    private static string Days(decimal count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return Pluralize(count, "day", "days", format);
    }

    public static MarkupString CardsMarkup(decimal count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return new MarkupString(Cards(count, format));
    }

    public static MarkupString SelectedCardsMarkup(decimal count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return new MarkupString(SelectedCards(count, format));
    }

    public static string Cards(decimal count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return Pluralize(count, "card", "cards", format);
    }

    public static string SelectedCards(decimal count, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return Pluralize(count, " selected card", " selected cards", format);
    }

    public static string CardsRaw(decimal count, string format = $"{CountKeyword} {UnitKeyword}")
    {
        return Pluralize(count, "card", "cards", format);
    }

    public static MarkupString PluralizeMarkup(decimal count, string singularUnit, string pluralUnit, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return new MarkupString(Pluralize(count, singularUnit, pluralUnit, format));
    }

    private static string Pluralize(decimal count, string singularUnit, string pluralUnit, string format = $"<strong>{CountKeyword}</strong> {UnitKeyword}")
    {
        return count == 1
            ? format.Replace(CountKeyword, count.ToString(CultureInfo.InvariantCulture)).Replace(UnitKeyword, singularUnit)
            : format.Replace(CountKeyword, count.ToString(CultureInfo.InvariantCulture)).Replace(UnitKeyword, pluralUnit);
    }
}