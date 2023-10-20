import {Injectable} from "@angular/core";
import {ToasterOptions, ToasterStyles} from "../../app-commons/components/toaster/toaster-util";
import {ToasterEnum} from "../../global/toaster-enum";


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  toasts: {options:ToasterOptions, styles:ToasterStyles}[] = [];

  show(options:ToasterOptions){
    const styles:ToasterStyles = this.getToastConfig(options.type);
    this.toasts.push({ options: {...options}, styles: {...styles} });
  }

  remove(toast: any){
    this.toasts = this.toasts.filter(t => t!==toast);
  }

  private getToastConfig(type:ToasterEnum):ToasterStyles{
    switch (type){
      case ToasterEnum.SUCCESS:
        return {borderClass: 'border-success', textClass: 'text-success', header: 'success'};
      case ToasterEnum.ERROR:
        return {borderClass: 'border-danger', textClass: 'text-danger', header: 'error'};
      case ToasterEnum.INFO:
        return {borderClass: 'border-info', textClass: 'text-info', header: 'information'};
      case ToasterEnum.WARNING:
        return {borderClass: 'border-warning', textClass: 'text-warning', header: 'warning'};
      default:
        return {borderClass: '', textClass: '', header: ''};
    }
  }

}
