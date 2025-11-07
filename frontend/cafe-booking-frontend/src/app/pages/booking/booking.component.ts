import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, Table } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  private bookingService = inject(BookingService);
  tables: Table[] = [];
  name = '';

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables() {
    this.bookingService.getTables().subscribe(t => this.tables = t);
  }

  bookTable(tableId: number) {
    const booking = {
      customerName: this.name,
      bookingDate: new Date().toISOString(),
      tableId
    };
    this.bookingService.addBooking(booking).subscribe(() => {
      alert('จองสำเร็จ!');
      this.loadTables();
    });
  }
}
