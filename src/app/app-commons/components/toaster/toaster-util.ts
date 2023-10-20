import {ToasterEnum} from "../../../global/toaster-enum";

export type ToasterOptions = {
  type: ToasterEnum,
  message: string,
  header?: string,
  params?: {
    [key: string]: string
  },
  delay?: number,
  translationContext?: string;
}

export type ToasterStyles = {
  borderClass: string,
  textClass: string,
  header: string
}
