import { FunctionComponent, useMemo, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useEnsAddress } from 'wagmi';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

export interface AddressInputProps {
  onSubmit: (value: string) => unknown;
}

export const AddressInput: FunctionComponent<AddressInputProps> = ({
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { data: address, isLoading } = useEnsAddress({ name: inputValue });

  const showSpinner = useMemo(() => {
    return inputValue.endsWith('.eth') && isLoading;
  }, [inputValue, isLoading]);

  const showError = useMemo(() => {
    if (isLoading) return false;
    if (!inputValue.endsWith('.eth')) return false;
    return address === null;
  }, [inputValue, isLoading, address]);

  return (
    <ModalForm
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (showError || showSpinner || inputValue.length === 0) {
          return;
        } else {
          if (typeof address === 'string') {
            onSubmit(address);
          }
        }
        setInputValue('');
      }}>
      <ModalFormItem showError={showError}>
        <AddAddressInput
          // type="submit"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
          placeholder="Enter an address..."
          spellCheck={false}
        />
        {showSpinner || (
          <SubmitWrapper type="submit">
            <Image
              src="/assets/images/plus-grey.svg"
              alt="plus"
              height={16}
              width={16}
            />
          </SubmitWrapper>
        )}
        {showSpinner && <LoadingSpinner height={24} width={24} />}
      </ModalFormItem>
    </ModalForm>
  );
};

const SubmitWrapper = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  background: none;
`;

const ModalForm = styled.form``;

const ModalFormItem = styled.div<{ showError: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  border: ${(p) => (p.showError ? '2px solid #f77272' : '2px solid #271d47')};
  border-radius: 8px;
  margin: 12px 0;
  margin-bottom: 12px;
  color: #75668c;
  padding: 12px 16px;
`;

const AddAddressInput = styled.input`
  border: none;
  outline: none;
  background: none;
  color: #252727;
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  ::placeholder {
    color: #75668c;
  }
`;
