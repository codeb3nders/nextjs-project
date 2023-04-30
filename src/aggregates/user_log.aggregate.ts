import { aggregateFormatDate } from "./helper.aggregate";

export class AggregateUserLog {
  values() {
    return [
      {
        $lookup: {
          from: "employees",
          localField: "employeeNo",
          foreignField: "employeeNo",
          as: "employeeDetails",
        },
      },

      {
        $set: {
          lastModifiedDate: aggregateFormatDate("lastModifiedDate"),
        },
      },
    ];
  }
}
