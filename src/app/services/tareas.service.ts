import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private localStorageKey = 'listaTareas';
  private tareasSubject = new BehaviorSubject<{ texto: string; completada: boolean }[]>([]);

  getTareas(): Observable<{ texto: string; completada: boolean }[]> {
    const tareas = JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
    this.tareasSubject.next(tareas);
    return this.tareasSubject.asObservable();
  }

  agregarTarea(nuevaTarea: string): Observable<{ texto: string; completada: boolean }[]> {
    const tareas = this.tareasSubject.getValue();
    tareas.push({ texto: nuevaTarea, completada: false });
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
    this.tareasSubject.next(tareas);
    return this.tareasSubject.asObservable();
  }

  eliminarTarea(index: number): Observable<{ texto: string; completada: boolean }[]> {
    const tareas = this.tareasSubject.getValue();
    if (index >= 0 && index < tareas.length) {
      tareas.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
      this.tareasSubject.next(tareas);
    }
    return this.tareasSubject.asObservable();
  }
  
  marcarComoCompletada(index: number): Observable<{ texto: string; completada: boolean }[]> {
    const tareas = this.tareasSubject.getValue();
    if (index >= 0 && index < tareas.length) {
      tareas[index].completada = true;
      localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
      this.tareasSubject.next(tareas);
    }
    return this.tareasSubject.asObservable();
  }
}
