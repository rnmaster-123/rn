import React, { memo, useRef, useCallback, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  StyleSheet,
} from 'react-native';
import { Controller, Control, Validate } from 'react-hook-form';
import { REGEX, FORM_ERR_MSG } from '../utils/constants';

interface Props {
  label: string;
  label2?: string;
  name: 'email' | 'password' | 'passwordCheck' | 'phone';
  errorMsg?: string;
  textInputConfig: ITextInputConfig;
  control: Control<any>;
  passwordVal?: string;
  accessibilityHint?: string;
}
type ITextInputConfig = {
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  placeholder?: string;
  secureTextEntry?: boolean;
};

function FormInput({
  label,
  label2,
  name,
  errorMsg,
  textInputConfig,
  control,
  passwordVal,
  accessibilityHint = '',
}: Props) {
  const aniRef = useRef(new Animated.Value(0));
  const shake = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(aniRef.current, {
          toValue: -4,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(aniRef.current, {
          toValue: 4,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(aniRef.current, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 },
    ).start();
  }, []);
  useEffect(() => {
    if (!errorMsg) return;
    shake();
  }, [shake, errorMsg]);
  const isPwCheck = name === 'passwordCheck';

  return (
    <Animated.View
      style={[
        styles.inputContainer,
        {
          transform: [{ translateX: aniRef.current }],
        },
      ]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.label2}>{label2}</Text>
      </View>

      {/* passwordCheck input인지 아닌지 여부에 따라 Controller의 pattern, rules가 다름 */}
      {!isPwCheck ? (
        <Controller
          control={control}
          name={name}
          rules={{
            required: true,
            pattern: {
              value: REGEX[name] as RegExp,
              message: FORM_ERR_MSG[name],
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errorMsg ? styles.errorInput : styles.input}
              onChangeText={onChange}
              value={value}
              {...textInputConfig}
              autoCapitalize="none"
              accessibilityHint={accessibilityHint}
            />
          )}
        />
      ) : (
        <Controller
          control={control}
          name={name}
          rules={{
            required: true,
            validate: {
              samePassword: val =>
                val === passwordVal || FORM_ERR_MSG[name],
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errorMsg ? styles.errorInput : styles.input}
              onChangeText={onChange}
              value={value}
              {...textInputConfig}
              autoCapitalize="none"
              accessibilityHint={accessibilityHint}
            />
          )}
        />
      )}
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </Animated.View>
  );
}
export default memo(FormInput);

// type samePasswordParameters = {
//   val: string;
//   name: string;
//   passwordVal: string;
// };
// export const samePassword: Validate<samePasswordParameters> = ({
//   val,
//   name,
//   passwordVal,
// }): string | boolean => {
//   return val === passwordVal || FORM_ERR_MSG[name];
// };

interface ICommonInput {
  backgroundColor: string;
  padding: number;
  borderRadius: number;
  fontSize: number;
  borderWidth: number;
}
const commonInput: ICommonInput = {
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 6,
  fontSize: 18,
  borderWidth: 1,
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 16,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label2: {
    fontWeight: '300',
  },
  input: {
    ...commonInput,
    borderColor: '#000',
  },
  errorInput: {
    ...commonInput,
    borderColor: 'red',
    backgroundColor: '#FFC3C3',
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
  },
});
