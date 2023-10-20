import {Component, OnInit} from '@angular/core';
import {ToasterOptions, ToasterStyles} from "./toaster-util";
import {TranslocoService} from "@ngneat/transloco";
import {ToasterService} from "../../../services/oth/toaster.service";

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3 mt-5', 'style': 'z-index: 1200;' },
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit{

  constructor(
    private translationService:TranslocoService,
    private toasterService:ToasterService
  ) {
  }

  ngOnInit() {

  }

  close(toast:{options:ToasterOptions, styles:ToasterStyles}){
    this.toasterService.remove(toast);
  }

  getToasterService():ToasterService{
    return this.toasterService;
  }

}
