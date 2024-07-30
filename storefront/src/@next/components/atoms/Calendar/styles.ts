import { media, styled } from "@styles";

// 1. Calendar
export const Wrapper = styled.div<{
  loading?: boolean;
}>`
  opacity: ${props => (props.loading ? "0.2" : "1")}
  width: 70%;

  ${media.smallScreen`
    width: 100%;
  `}

  // General calendar styles
  .react-calendar {
    border: none;
    font-family: inherit;
    width: 100%;
  }

  // Header & navigation styles
  .react-calendar__navigation {
    height: 24px;

    &__arrow {
      &:enabled {
        &:hover {
          background-color: ${props => props.theme.colors.white};
        }
        &:focus {
          background-color: ${props => props.theme.colors.white};
        }
      }

      &:disabled {
        background-color: ${props => props.theme.colors.white};
        cursor: grab;
      }
    }

    &__label {
      background-color: ${props => props.theme.colors.white};

      &[disabled] {
        background-color: ${props => props.theme.colors.white};
        cursor: grab;
      }

      &__labelText {
        font-size: 16px;
        line-height: 24px;
        color: #131516;
        font-weight: 500;
      }
    }
  }

  // Weekdays styles
  .react-calendar__month-view__weekdays {
    border-bottom: 1px solid #a7afb2;
    margin-bottom: 8px;
    padding-bottom: 4px;

    &__weekday {
      font-size: 16px;
      line-height: 24px;
      font-weight: 500;
      padding: 0;
      text-transform: none;
      text-decoration: none;

      abbr {
        text-decoration: none;
      }
    }
  }

  // Day/tile styles
  .react-calendar__tile {
    background-color: ${props => props.theme.colors.white};
    font-weight: ${props => props.theme.typography.semiBoldFontWeight};
    padding: 10px 5px;

    // Weekend colors
    &:not(:disabled) {
      &.react-calendar__month-view__days__day--weekend {
        &:not(.react-calendar__month-view__days__day--neighboringMonth) {
          color: ${props => props.theme.colors.black};
        }
      }
    }

    &:disabled {
      background-color: ${props => props.theme.colors.white};
      color: #757575;
      cursor: grab;
    }

    &:enabled {
      &:hover {
        background-color: ${props => props.theme.colors.white};
        cursor: grab;
      }
      &:focus {
        background-color: ${props => props.theme.colors.white};
      }
    }

    &--active{
      color: ${props => props.theme.colors.white} !important;

      abbr {
        background-color: ${props => props.theme.colors.primary700} !important;
      }
    } 

    // Available day styles
    &.available {
      &:enabled {
        &:hover {
          cursor: pointer;

          abbr {
            background-color: ${props => props.theme.colors.primary};
          }
        }
        &:focus abbr {
          background-color: ${props => props.theme.colors.primary};
        }
      }

      abbr {
        background-color: ${props => props.theme.colors.primary_300};
      }
    }

    // Booked day styles
    &.booked {
      &:enabled {
        &:hover abbr {
          background-color: ${props => props.theme.colors.errorRed_200};
        }
        &:focus abbr {
          background-color: ${props => props.theme.colors.errorRed_200};
        }
      }
      abbr {
        background-color: ${props => props.theme.colors.errorRed_200};
      }
    }

    // Unavailable day styles
    &.unavailable {
      &:enabled {
        &:hover {
          background-color: ${props => props.theme.colors.white};
        }
        &:focus {
          background-color: ${props => props.theme.colors.white};
        }
      }
    }

    abbr {
      border-radius: 100px;
      display: inline-block;
      font-size: 14px;
      line-height: 21px;
      padding: 2px 0 1px;
      width: 24px;
    }
  }
`;

// 2. Day captions
export const DayCaptionsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;
