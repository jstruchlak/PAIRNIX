import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { memberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { adminGuard } from './_guards/admin.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
        {path: 'members/:username', component: MemberDetailComponent, resolve: {member: memberDetailedResolver}},
        {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
        {path: 'lists', component: ListsComponent},
        {path: 'messages', component: MessagesComponent},
        {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]},
      ]
    },
    {path: 'errors', component: TestErrorsComponent },
    {path: 'not-found', component: NotFoundComponent },
    {path: 'server-error', component: ServerErrorComponent },
    {path: '**', component: HomeComponent, pathMatch: 'full'},
  ];
