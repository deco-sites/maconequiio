const formatters = new Map<string, Intl.NumberFormat>();

const formatter = (currency: string, locale: string) => {
  const key = `${currency}::${locale}`;

  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }),
    );
  }

  return formatters.get(key)!;
};

export const formatPrice = (
  price: number | undefined,
  currency = "BRL",
  locale = "pt-BR",
) => price ? formatter(currency, locale).format(price) : null;

export const formatInstallments = (str: string | null) => {
  if (!str) return "";
  const value = str.split("R$ ")[1].split(" ")[0];
  const newValue = `${formatPrice(parseFloat(value))}`;
  str = str.replace(`R$ ${value}`, newValue);
  return str;
};
