import { supabase } from '../func/supabase';

export async function createUser(id, username) {
  const { error } = await supabase
    .from('users')
    .insert({ id, username });
  return error;
}