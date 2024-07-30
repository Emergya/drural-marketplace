import EditorJS, { LogLevels, OutputData } from "@editorjs/editorjs";
import { FormControl, FormHelperText, InputLabel } from "@material-ui/core";
import useHandlerWhenClickedOutside from "@saleor/hooks/useHandleClickedOutside";
import classNames from "classnames";
import React from "react";

import { RichTextEditorContentProps, tools } from "./RichTextEditorContent";
import useStyles from "./styles";

export type RichTextEditorChange = (data: OutputData) => void;
export interface RichTextEditorProps extends RichTextEditorContentProps {
  disabled: boolean;
  error: boolean;
  helperText: string;
  label: string;
  name: string;
  onChange: RichTextEditorChange;
  required?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  data,
  disabled,
  error,
  helperText,
  label,
  name,
  onChange,
  onReady,
  required
}) => {
  const classes = useStyles({});
  const [isFocused, setFocus] = React.useState(false);
  const editor = React.useRef<EditorJS>();
  const editorContainer = React.useRef<HTMLDivElement>();
  const prevTogglePromise = React.useRef<Promise<boolean>>(); // used to await subsequent toggle invocations
  const initialMount = React.useRef(true);

  // Adds inputLabelState funtionallity
  const [labelState, setLabelState] = React.useState({
    isFocus: false,
    isShrink: false
  });
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    if (!editorContainer.current?.innerText) {
      setLabelState({
        isFocus: false,
        isShrink: false
      });
    } else {
      setLabelState({
        isFocus: false,
        isShrink: true
      });
    }
  });

  React.useEffect(
    () => {
      let mounted = true;
      if (data !== undefined) {
        editor.current = new EditorJS({
          data,
          holder: editorContainer.current,
          logLevel: "ERROR" as LogLevels,
          onChange: async api => {
            // Sets async state only if component is mounted, otherwise it will cause a react warning: update state on unmounted component
            if (mounted) {
              const savedData = await api.saver.save();
              onChange(savedData);
            }
          },
          onReady: () => {
            // FIXME: This throws an error and is not working
            // const undo = new Undo({ editor });
            // undo.initialize(data);

            if (onReady) {
              onReady();
            }
          },
          readOnly: disabled,
          tools
        });

        // Shrinks label for first time if text editor has content
        if (data?.blocks?.length) {
          setLabelState({
            ...labelState,
            isShrink: true
          });
        }
      }

      return () => {
        mounted = false;

        if (editor.current && editor.current.destroy) {
          // eslint-disable-next-line chai-friendly/no-unused-expressions
          editor.current.destroy();
        }
      };
    },
    // Rerender editor only if changed from undefined to defined state
    [data === undefined]
  );

  React.useEffect(() => {
    const toggle = async () => {
      if (!editor.current) {
        return;
      }

      await editor.current.isReady;
      if (editor.current?.readOnly) {
        // readOnly.toggle() by itself does not enqueue the events and will result in a broken output if invocations overlap
        // Remove this logic when this is fixed in EditorJS
        if (prevTogglePromise.current instanceof Promise) {
          await prevTogglePromise.current;
        }
        prevTogglePromise.current = editor.current.readOnly.toggle(disabled);

        // Switching to readOnly with empty blocks present causes the editor to freeze
        // Remove this logic when this is fixed in EditorJS
        if (!disabled && !data?.blocks?.length) {
          await prevTogglePromise.current;
          editor.current.clear();
        }
      }
    };

    if (!initialMount.current) {
      toggle();
    } else {
      initialMount.current = false;
    }
  }, [disabled]);

  return (
    <FormControl
      data-test="richTextEditor"
      data-test-id={name}
      disabled={disabled}
      error={error}
      fullWidth
      variant="outlined"
      ref={setElementRef()}
      className={classNames(classes.formControl)}
    >
      <InputLabel
        onClick={() =>
          setLabelState({
            isFocus: true,
            isShrink: true
          })
        }
        focused={labelState.isFocus}
        shrink={labelState.isShrink}
      >
        {label}
        {required && " *"}
      </InputLabel>
      <div
        className={classNames(classes.editor, classes.root, {
          [classes.rootActive]: isFocused,
          [classes.rootDisabled]: disabled,
          [classes.rootError]: error
        })}
        ref={editorContainer}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        // Set inputLabelState
        onMouseDown={() =>
          setLabelState({
            isFocus: true,
            isShrink: true
          })
        }
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
