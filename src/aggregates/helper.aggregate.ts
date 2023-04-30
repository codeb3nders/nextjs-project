export const aggregateFormatDate = (date: string) => {
  return {
    $dateToString: {
      format: '%Y-%m-%d',
      date: { $toDate: `$${date}` },
    },
  };
};

export const aggregateLookUp = (
  tableName: string,
  localField: string,
  foreignField: string,
  asName: string,
) => {
  return {
    from: `${tableName}`,
    let: { field: { $toUpper: `$${localField}` } },
    pipeline: [
      { $addFields: { [`${foreignField}`]: { $toUpper: `$${foreignField}` } } },
      { $match: { $expr: { $eq: [`$${foreignField}`, `$$field`] } } },
    ],
    as: asName,
  };
};
