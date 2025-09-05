export const flattenNestedArray = (mainArray: any[], nestedKey: string, transformFn: (parentItem: any, childItem: any) => any): any[] => {
  const flattened: any[] = [];
  for (const parentItem of mainArray) {
    if (parentItem && parentItem[nestedKey] && Array.isArray(parentItem[nestedKey])) {
      for (const childItem of parentItem[nestedKey]) {
        flattened.push(transformFn(parentItem, childItem));
      }
    }
  }
  return flattened;
};

export const analyzeDataGroups = (dataArray: any[], groupKey: string, valueKey: string, dateKey: string): any[] => {
  if (!dataArray || dataArray.length === 0) {
    return [];
  }

  const uniqueGroupIds: any[] = [...new Set(dataArray.map((item) => item[groupKey]))];
  const lastDate: any = dataArray.length > 0 ? dataArray[dataArray.length - 1][dateKey] : undefined;

  const results: any[] = [];

  for (const groupId of uniqueGroupIds) {
    const groupItems = dataArray.filter((item) => item[groupKey] === groupId);
    
    if (groupItems.length === 0) continue;

    let maxVal: number = -Infinity;
    let minVal: number = Infinity;
    let idMax: any = -1;
    let idMin: any = -1;

    for (const item of groupItems) {
      const value: number = item[valueKey];
      const date: any = item[dateKey];

      if (value >= maxVal) {
        maxVal = value;
        idMax = date;
      }
      if (value < minVal) {
        minVal = value;
        idMin = date;
      }
    }
    
    let percentage: number = 0;
    if (minVal !== 0 && minVal !== Infinity) {
        percentage = (maxVal / minVal - 1) * 100;
    }

    results.push({
      [groupKey]: groupId,
      maxWeight: maxVal,
      minWeight: minVal,
      idMaxWeight: idMax,
      idMinWeight: idMin,
      percentage: Number(percentage.toFixed(2)),
      isTheLastTraining: idMax === lastDate,
    });
  }

  return results;
};

