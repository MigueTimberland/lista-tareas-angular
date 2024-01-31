import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  listaTareas: { texto: string; completada: boolean }[] = [];
  nuevaTarea:string = '';
  
  constructor(private _tareasService: TareasService) {}

  ngOnInit(): void {
    this._tareasService.getTareas().subscribe(tareas => {
      this.listaTareas = tareas;
    });
  }

  agregarTarea() {
    this._tareasService.agregarTarea(this.nuevaTarea).subscribe(tareas => {
      this.listaTareas = tareas;
      this.nuevaTarea = '';
    });
  }

  eliminarTarea(index: number) {
    this._tareasService.eliminarTarea(index).subscribe(tareas => {
      this.listaTareas = tareas;
    });
  }

  marcarComoCompletada(index: number) {
    this._tareasService.marcarComoCompletada(index).subscribe(tareas => {
      this.listaTareas = tareas;
    });
  }
  
}
