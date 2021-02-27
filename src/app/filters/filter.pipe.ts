import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, prop: string, value: any): any {
    if (!value) return items;
    const props = prop.split('.');
    return items.filter((item) => {
      const propValue = this.nestedProp(item, props)?.toLowerCase();
      return propValue?.indexOf(value.toLowerCase()) > -1;
    });
  }

  /**
   * Get property value from nested object by its full path.
   */
  private nestedProp(data: Object, path: Array<string>) {
    if (!path || !data) {
      return null;
    }
    return path.reduce((object: any, field: string) => (object || {})[field], data) || '';
  }
}
