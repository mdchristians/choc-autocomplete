import {
  CSSObject,
  forwardRef,
  Input,
  InputProps,
  useMergeRefs,
  useMultiStyleConfig,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { runIfFn } from "@chakra-ui/utils";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import React from "react";

import { useAutoCompleteContext } from "./autocomplete-context";
import { UseAutoCompleteReturn } from "./types";

export interface AutoCompleteInputProps extends InputProps {
  children?: MaybeRenderProp<{ tags: UseAutoCompleteReturn["tags"] }>;
  wrapStyles?: CSSObject;
}

export const AutoCompleteInput = forwardRef<AutoCompleteInputProps, "input">(
  (props, forwardedRef) => {
    const { inputRef, getInputProps, tags } = useAutoCompleteContext();

    // const ref = useMergeRefs(forwardedRef, inputRef);

    const { children: childrenProp, ...rest } = props;

    const themeInput: any = useMultiStyleConfig("Input", props);

    const { wrapper, input: inputProps } = getInputProps(rest, themeInput);
    const { ref: wrapperRef, ...wrapperProps } = wrapper;
    const ref = useMergeRefs(forwardedRef, wrapperRef);

    const children = runIfFn(childrenProp, { tags });

    return (
      <Wrap {...wrapperProps} ref={ref}>
        {children}
        <WrapItem as={Input} {...(inputProps as any)} ref={inputRef} />
      </Wrap>
    );
  }
);

AutoCompleteInput.displayName = "Input";

AutoCompleteInput.id = "Input";
