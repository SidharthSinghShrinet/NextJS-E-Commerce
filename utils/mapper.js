export function mapper(product) {
  return {
    ...product,
    specifications: (product.specifications ?? []).map(
      ({ key, value, type, unit }) => {
        let formattedValue;

        switch (type) {
          case "string":
            formattedValue = value;
            break;

          case "number":
            formattedValue = unit ? `${value}${unit}` : String(value);
            break;

          case "boolean":
            formattedValue = value ? "Yes" : "No";
            break;

          case "array":
            formattedValue = value.join(", ");
            break;

          case "object":
            formattedValue = Object.entries(value)
              .map(([k, v]) => `${k}: ${v}${unit ?? ""}`)
              .join(", ");
            break;

          default:
            formattedValue = String(value);
        }

        return {
          label: key[0].toUpperCase() + key.slice(1),
          value: formattedValue,
        };
      },
    ),
  };
}
