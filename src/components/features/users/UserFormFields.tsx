'use client';

import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PANGKAT_GOLONGAN_OPTIONS,
  JABATAN_OPTIONS,
  UNIT_BAGIAN_OPTIONS,
  ROLE_OPTIONS,
} from '@/lib/constants';
import { UserFormValues } from '@/types/users/schema';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import { useState } from 'react';

interface UserFormFieldsProps {
  form: UseFormReturn<UserFormValues>;
}

export function UserFormFields({ form }: UserFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="nip"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>NIP</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan NIP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  {...field}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <HiEyeSlash className="h-5 w-5" />
                  ) : (
                    <HiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Nama</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan nama" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pangkatGolongan"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Pangkat/Golongan</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Pangkat/Golongan" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PANGKAT_GOLONGAN_OPTIONS.map((pangkatGolongan) => (
                  <SelectItem key={pangkatGolongan} value={pangkatGolongan}>
                    {pangkatGolongan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="jabatan"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Jabatan</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Jabatan" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {JABATAN_OPTIONS.map((jabatan) => (
                  <SelectItem key={jabatan} value={jabatan}>
                    {jabatan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="unitBagian"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Unit Bagian</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Unit Bagian" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {UNIT_BAGIAN_OPTIONS.map((unitBagian) => (
                  <SelectItem key={unitBagian} value={unitBagian}>
                    {unitBagian}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Role</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ROLE_OPTIONS.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}