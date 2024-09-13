import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

@Pipe({
  name: "dateFormat",
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return value;
    return moment(value).format("DD/MM/YYYY HH:mm");
  }
}
