import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Table {
  id: number;
  name: string;
  isAvailable: boolean;
}

export interface Booking {
  id?: number;
  customerName: string;
  bookingDate: string;
  tableId: number;
  table?: Table;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/tables`);
  }

  addTable(table: Partial<Table>) {
    return this.http.post(`${this.apiUrl}/tables`, table);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  addBooking(data: Partial<Booking>) {
    return this.http.post(`${this.apiUrl}/bookings`, data);
  }
}
