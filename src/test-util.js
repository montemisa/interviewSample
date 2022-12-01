import React from "react"
import { render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

const customRender = (
  node,
  options
) => {
  return render(
    <MockedProvider>{node}</MockedProvider>,
    options
  )
}

export * from "@testing-library/react"
export { customRender as render }
