import { styled } from "@styles";

export const Content = styled.div`
  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1.75rem;
  }

  h3 {
    margin-bottom: 1.5rem;
  }

  p {
    margin: 1.5rem 0;
  }

  h1 a,
  h2 a,
  h3 a,
  p a,
  li a,
  blockquote a {
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: ${({ theme }) => theme.typography.boldFontWeight};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  img {
    max-width: 100%;
  }

  ol,
  ul {
    margin: 1.5rem auto;
    margin-left: 2.8rem;
    padding-left: 0;
    li {
      padding-left: 0.5em;
      margin-bottom: 0.5rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ol {
    li {
      list-style-type: auto;
    }
  }

  ul {
    li {
      list-style-type: circle;
    }
  }

  blockquote {
    font-size: 1.125rem;
    font-style: italic;
    background-color: ${props => props.theme.colors.primaryTransparent};
    border-left: 0.3rem solid ${props => props.theme.colors.primaryDark};
    margin-bottom: 1rem;
    padding: 2rem;
    &:before {
      content: "";
      display: block;
      position: absolute;
      height: 1.5rem;
      width: 1.44rem;
      top: 1.56rem;
      background-image: url("../../../images/quote-icon.svg");
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .ce-block__content {
    max-width: 100%;
  }
`;
