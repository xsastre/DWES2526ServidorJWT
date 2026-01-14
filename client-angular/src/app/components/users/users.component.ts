import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User, UpdateUserRequest } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: any;
  selectedUser: User | null = null;
  editingUser: UpdateUserRequest = {};
  showEditModal: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Error carregant els usuaris';
        console.error('Error loading users:', error);
      }
    });
  }

  openEditModal(user: User): void {
    this.selectedUser = user;
    this.editingUser = {
      username: user.username,
      email: user.email,
      role: user.role,
      enabled: user.enabled
    };
    this.showEditModal = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedUser = null;
    this.editingUser = {};
  }

  updateUser(): void {
    if (!this.selectedUser) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.updateUser(this.selectedUser.id, this.editingUser).subscribe({
      next: (updatedUser) => {
        this.loading = false;
        this.successMessage = 'Usuari actualitzat correctament';
        this.loadUsers();
        setTimeout(() => {
          this.closeEditModal();
        }, 1500);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Error actualitzant l\'usuari';
        console.error('Error updating user:', error);
      }
    });
  }

  deleteUser(userId: number): void {
    if (!confirm('Estàs segur que vols eliminar aquest usuari?')) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Usuari eliminat correctament';
        this.loadUsers();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Error eliminant l\'usuari';
        console.error('Error deleting user:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
