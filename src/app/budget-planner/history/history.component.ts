import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  todoForm: any;
  selectedMonth: string;
  expenses: {month: string, expenseAmount: number }[]= [
    { month: 'January', expenseAmount: 1500},
    { month: 'February', expenseAmount: 2000},
    { month: 'March', expenseAmount: 1800}
  ];
  monthSelected:boolean = false;

  januaryExpense: any[] = [
    {expenseType: 'Recharge', expenseAmount: 1000},
    {expenseType: 'Light Bill', expenseAmount: 500}
  ]
  februaryExpense: any[] = [
    {expenseType: 'Essentials', expenseAmount: 200},
    {expenseType: 'Light Bills', expenseAmount: 400}
  ]
  marchExpense: any[] = [
    {expenseType: 'Recharge', expenseAmount: 1100},
    {expenseType: 'Essentials', expenseAmount: 250}
  ];
  constructor(private fb:FormBuilder, public router:Router){
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', {month: 'long'})
    this.selectedMonth = currentMonth;
  }
  ngOnInit(): void{
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }
  onSubmitExpense(){
    if(this.todoForm.valid){
      const newExpense = this.todoForm.value;
      switch(this.selectedMonth){
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
          this.februaryExpense.push(newExpense);
          break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({month: '', expenseType: '', expenseAmount: ''});
  }
}
  onChangeExpense(event: any){
    this.selectedMonth = event.target.value;
    this.monthSelected =true;
    this.getFilteredExpenses();
  }
  getFilteredExpenses(){
    let filteredExpense: any[] = [];
    switch (this.selectedMonth){
      case 'January':
        filteredExpense = [...this.januaryExpense];
        break;
      case 'February':
        filteredExpense = [...this.februaryExpense];
        break;
      case 'March':
        filteredExpense = [...this.marchExpense];
        break;
      default:
        break;
    }
    return filteredExpense
  }
  calculateTotalExpense(month: string): number{
    let totalExpense = 0;
    for(const income of this.gettodoFormonth(month)){
      totalExpense += income.expenseAmount;
    }
    return totalExpense;
  }
  gettodoFormonth(month: string): any[]{
    switch(month){
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }
  toggleSelection(todoTrans: any) {
    todoTrans.selected = !todoTrans.selected;
  }
  onSave(){
    if(this.todoForm.valid){
      const incomeData = this.todoForm.value;
      this.todoForm.reset({month: this.selectedMonth});
      this.getFilteredExpenses();
    }
  }
  saveForm(){
    console.log("Form Saved!");
  }
  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }
}



