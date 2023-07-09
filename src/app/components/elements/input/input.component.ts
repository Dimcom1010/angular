import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit,OnDestroy{


  @Input() value:string=''
  @Input() plaseholder:string=''
  @Output() search= new EventEmitter<string>();
  @Output() fastSearch= new EventEmitter<string>();

  inputControl!: FormControl ;

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.inputControl = new FormControl('');
    this.inputControl.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.fastSearch.emit(value)
    });
  }


  clickSearch(){
    const value:string=this.inputControl.value
    this.search.emit(value)
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
