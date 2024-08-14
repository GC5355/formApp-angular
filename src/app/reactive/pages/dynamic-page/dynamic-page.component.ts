import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html'
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required );    // lo llamo desde le html FormControl

  constructor( private fb : FormBuilder ){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray
  }


  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  isValidFieldInArray( formArray : FormArray, index: number ) {
    return formArray.controls[index].errors
        && formArray.controls[index].touched
  }


  onDeleteFavorite( index: number ) : void{
    this.favoriteGames.removeAt(index);
  }

  onAdToFavorites(): void{
    if ( this.newFavorite.invalid) return
    const newGame = this.newFavorite.value

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    )

    this.newFavorite.reset();  // resetea el FormControl para que pueda ser usado de nuevo
  }


  onSubmit() : void{

    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
   ( this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([])     // Para que se eliminen los inputs cuando guardo y solo quede un input
    this.myForm.reset();
  }


  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }

}
