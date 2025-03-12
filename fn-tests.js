async function searchByDate(props) {
  // get object properties
  const fields = props;
  // filter out null value properties
  const keys = Object.keys(fields);

  const validKeys = keys.filter(
    (key) => fields[key] !== 0 && typeof fields[key] === "number"
  );
  // make db queries for obtained props

  if (validKeys.length < 1) {
    throw new Error(
      `Search object values are invalid. Operation aborted due to null query values. Valid key length is ${validKeys.length}`
    );
  }

  const searchObject = {};

  validKeys.forEach((validKey) => (searchObject[validKey] = fields[validKey]));
  console.log({
    searchObject,
  });

  //   return [{}];
}

searchByDate({ day: "sjdsjk", month: "0" });
