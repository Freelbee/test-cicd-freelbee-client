'use client';

import styled, { css } from 'styled-components';
import { Button, Color, Heading1, Input, PasswordInput, Select, Text } from '@freelbee/shared/ui-kit';
import React, { FormEvent, useState } from 'react';
import { AdminRoleDto, useCreateAdminUserMutation, useGetAdminRolesQuery } from '@admin/entities';

export const AdminCreationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminRolesSelected, setAdminRolesSelected] = useState<AdminRoleDto[]>([]);
  const [adminRoleLastOnHover, setAdminRoleLastOnHover] = useState<AdminRoleDto | null>(null);
  const [isSuccessButton, setSuccessButton] = useState(false);

  const { data: adminRoles } = useGetAdminRolesQuery();
  const [createAdminUser, { isLoading, isSuccess }] = useCreateAdminUserMutation();

  if (!adminRoles) return <></>;

  const getRoleNameModified = (adminRole: AdminRoleDto) => adminRole.name.replace('ROLE__', '');
  const renderRole = (adminRole: AdminRoleDto) => {
    return (
      <RoleContainer onMouseEnter={() => setAdminRoleLastOnHover(adminRole)}>
        <Text color={Color.GRAY_700}>{getRoleNameModified(adminRole)}</Text>
      </RoleContainer>
    );
  };

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAdminUser({ email, password, roles: adminRolesSelected })
      .then(() => {
        if (isSuccess) {
          setEmail('');
          setPassword('');
          setAdminRolesSelected([]);
          setSuccessButton(true);
          setAdminRoleLastOnHover(null);
          setTimeout(() => {
            setSuccessButton(false);
          }, 3000);
        }
      });
  };

  return (
    <FormContent>
      <Form onSubmit={(e) => sendForm(e)}>
        <Input
          label="E-mail"
          placeholder="E-mail"
          value={email}
          setValue={(value) => setEmail(value)}
        />
        <PasswordInput
          label="Password"
          value={password}
          setValue={(value) => setPassword(value)}
        />
        <Select<AdminRoleDto>
          placeholder={'Select roles'}
          items={adminRoles}
          onSelect={(item) => {
            if (!adminRolesSelected.includes(item)) {
              setAdminRolesSelected(prev => [...prev, item]);
            } else {
              setAdminRolesSelected(prev => prev.filter((adminRole) => adminRole.name !== item.name));
            }
          }}
          listRender={(item) => renderRole(item)}
        />
        <Button
          type="submit"
          isWide
          isLoading={isLoading}
          styles={isSuccessButton ? css`background-color: ${Color.EMERALD}` : undefined}
        >
          {isSuccessButton ? 'Success' : 'Create admin'}
        </Button>
      </Form>
      <RoleDescription>
        <Heading1 color={Color.GRAY_800}>{adminRoleLastOnHover && getRoleNameModified(adminRoleLastOnHover)}</Heading1>
        <RolePrivileges>
          {adminRoleLastOnHover && adminRoleLastOnHover?.privileges?.map((privilege, index) => {
            return <Text key={index} color={Color.GRAY_800}>{privilege.name}</Text>;
          })}
        </RolePrivileges>
      </RoleDescription>
      <RoleDescription>
        <Heading1 color={Color.GRAY_800}>Selected roles</Heading1>
        <RolePrivileges>
          {adminRolesSelected && adminRolesSelected?.map((adminRole, index) => {
            return <Text key={index} color={Color.GRAY_800}>{getRoleNameModified(adminRole)}</Text>;
          })}
        </RolePrivileges>
      </RoleDescription>
    </FormContent>
  );
};

const FormContent = styled.div`
  display: flex;
  gap: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;
`;

const RoleContainer = styled.div`
  cursor: pointer;
`;

const RoleDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  max-width: 320px;
  height: 100%;
  overflow: auto;
`;

const RolePrivileges = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: flex-start;
  height: 100%;
`;
