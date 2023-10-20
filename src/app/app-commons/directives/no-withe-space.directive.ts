import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from "@angular/forms";
import {Directive, ElementRef, forwardRef, HostListener} from "@angular/core";

@Directive({
  selector: '[noWhitespace][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoWitheSpaceDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NoWitheSpaceDirective),
      multi: true
    }
  ]
})
export class NoWitheSpaceDirective implements ControlValueAccessor, Validator {

  constructor(
    private element:ElementRef<HTMLInputElement>
  ) {
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value:string){
    const trimmedValue = value.trim();
    this.element.nativeElement.value = trimmedValue;
    this.onChange(trimmedValue);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.element.nativeElement.value = value == null ? '' : value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): { [key: string]:any} | null {
    if(!this.element.nativeElement.value.trim() && this.element.nativeElement.required){
      return { required: true };
    }
    return null;
  }

  private onChange = (value: any) => { };
  private onTouched = () => { };

}
