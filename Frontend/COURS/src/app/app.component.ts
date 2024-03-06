import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'

import { EtudiantService } from './etudiant.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COURS';
  isEditMode: boolean = false; 
  departements:any;
  etudiants:any;
  myForm:FormGroup;
  selectedEtudiantId: number | null = null;
  selectedEtudiant: any; // Ajouter cette propriété

  // ...

  constructor(private service:EtudiantService, private fb:FormBuilder){
    this.myForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      matricule:['',Validators.required],
      departement:['',Validators.required,],
    })
    
    this.getDepartements();
    this.getEtudiants();

  }
  resetData(){
    this.myForm.reset();
            this.getDepartements();
            this.getEtudiants();
  }


  getDepartements(){
    this.service.getDepartement().subscribe({
      next:(response)=>{
        console.log(response)
        this.departements = response
      },
      error:(error)=>console.log(error)
    })
  }


  getEtudiants(){
    this.service.getEtudiants().subscribe({
      next:(response)=>{
        this.etudiants = response
      },
      error:(error)=>console.log(error)
    })
  }

  modifier(etudiant: any) {
    this.isEditMode = true
    this.selectedEtudiantId = etudiant._id;
    this.selectedEtudiant = etudiant;
    const departementName = etudiant.departement ? etudiant.departement.name : ''
    console.log(etudiant.departement)
    console.log(departementName)
    this.myForm.patchValue({
      firstname: etudiant.firstname,
      lastname: etudiant.lastname,
      matricule: etudiant.matricule,
      departement: departementName
    });
  }
  // app.component.ts
supprimer(etudiant: any) {
  const confirmation = confirm('Voulez-vous vraiment supprimer cet étudiant ?');
  if (confirmation) {
    this.service.deleteEtudiant(etudiant._id).subscribe({
      next: () => {
        this.resetData(); // Mettez à jour la liste après la suppression
      },
      error: (error) => console.error(error)
    });
  }
}




  enregistrer() {
  if (this.myForm.valid) {
    if (this.isEditMode) {
      if (this.selectedEtudiantId !== null) {

        // Modification d'un étudiant existant

        this.service.updateEtudiant(this.selectedEtudiantId, this.myForm.value).subscribe({
          next: (response) => {
            this.resetData()

            this.selectedEtudiantId = null; // Réinitialise l'ID après la modification
          },
          error: (error) => console.error(error)
        });
      }} else {
        // Ajout d'un nouvel étudiant
        this.service.saveEtudiant(this.myForm.value).subscribe({
          next: (response) => {
            this.myForm.reset();
            this.getDepartements();
            this.getEtudiants();
          },
          error: (error) => console.error(error)
        });
      }
    }
  }

}
