import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer, userFeatureKey } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

@NgModule({
  imports: [StoreModule.forFeature(userFeatureKey, userReducer), EffectsModule.forFeature([UserEffects])],
})
export class UserModule {}
