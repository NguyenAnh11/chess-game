import React, { ReactElement } from "react";
import {
  FieldControl,
  BaseSetting,
  FieldSelectControl,
  FieldSwitchControl,
} from "../../types";
import { SelectControl, SwitchControl } from "./Controls/";

type EditFormProps<T extends BaseSetting> = {
  controls: FieldControl<T>[];
};

export default function EditForm<T extends BaseSetting>({
  controls,
}: EditFormProps<T>) {
  const _render = (): ReactElement[] => {
    const elements: ReactElement[] = [];
    for (let idx = 0; idx < controls.length; idx++) {
      const control = controls[idx];

      if (control instanceof FieldSelectControl) {
        elements.push(
          <SelectControl key={idx} {...(control as FieldSelectControl<T>)} />
        );
      }

      if (control instanceof FieldSwitchControl) {
        elements.push(
          <SwitchControl key={idx} {...(control as FieldSwitchControl<T>)} />
        );
      }
    }

    return elements;
  };

  return <React.Fragment>{_render()}</React.Fragment>;
}
