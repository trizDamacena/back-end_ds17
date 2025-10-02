import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-login.components',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.components.html',
  styleUrls: ['./login.components.css']
})

export class LoginComponents {
  private fb = inject(FormBuilder)
  private auth = inject(AuthService)
  private router = inject(Router)

  loading = signal(false)
  error = signal<string | null>(null)
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  
  })

  onSubmit(){
      if (this.form.invalid) return

      this.loading.set(true)
      this.error.set(null)

      const {username, password} = this.form.value as {username: string; password: string}
      this.auth.login(username, password).subscribe({
        next: () =>{
          this.loading.set(false)
          this.router.navigateByUrl("/home")
        },

        error: (e)=>{
          this.loading.set(false)
          this.error.set("Usuário ou senha estão incorretos")
        }
      })
    }
}
