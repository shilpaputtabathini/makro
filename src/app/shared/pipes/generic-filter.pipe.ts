import { Pipe, Injectable, PipeTransform } from "@angular/core";

@Pipe({
  name: 'genericFilter',
  pure: false
})
export class GenericFilterPipe implements PipeTransform {
  transform(items = [], searchTerm = '', excludes = []) {

    if (!searchTerm || !items) {
      return items;
    }

    return items.filter((item) => {
      return this.verifyItem(item, searchTerm, excludes);
    });
  }

  verifyItem(item, searchTerm, excludes) {
    const toCompare = searchTerm.toLowerCase();

    for (let property in item) {
      if (item[property] === null || item[property] == undefined || excludes.includes(property)) {
        continue;
      }

      if (typeof item[property] === 'object') {
        if (this.verifyItem(item[property], searchTerm, excludes)) {
          return true;
        }
      } else if (item[property].toString().toLowerCase().includes(toCompare)) {
        return true;
      }
    }

    return false;
  }
}
