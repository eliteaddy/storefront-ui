import "../global-config";

import React from "react";

import { Grid, GridItem } from "@commerce-ui/core/Grid";
import Container from "@commerce-ui/core/Container";
import { useTheme } from "@commerce-ui/core/Theme";
import Device from "@commerce-ui/core/Device";
import { L } from "../theme.js";

import { rslin } from "responsive-helpers";

import { StatefulInput } from "../components/Input";
import Banner from "../components/Banner";
import TwoBanners from "../components/TwoBanners";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import SectionTitle from "../components/SectionTitle";
import CategoryCard from "../components/CategoryCard";

import data from "../data";
import routerPush from "../helpers/routerPush";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import useProducts from "../graphql/hooks/useProducts";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Categories displayed at the bottom
const categories = [
  "Bars",
  "Candy",
  "Chips & Pretzels",
  "Cookies",
  "Crackers & Crisps",
  "Fruit & Vegetable Snacks",
  "Jerky",
  "Popcorn & Puffs"
].map((category, index) => ({
  title: category,
  image: data.images["landscape" + ((index % 4) + 2)],
  href: "/collection"
}));

const GQL_HOMEPAGE_SLIDER_PRODUCTS = gql`
  query {
    collectionByHandle(handle: "homepage-slider") {
      handle
      title
      description
      image {
        id
        originalSrc
        altText
        variants {
          name
          aspectRatio
          src
        }
      }
      products {
        edges {
          node {
            id
            title
            handle
            availableForSale
            createdAt
            tags
            variants {
              edges {
                node {
                  id
                  sku
                  price {
                    amount
                    currencyCode
                  }
                  title
                }
              }
            }
            options {
              name
              values
            }
            images {
              edges {
                node {
                  originalSrc
                  variants {
                    name
                    aspectRatio
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Home = () => {
  const theme = useTheme();

  let sliderCollection = useQuery(GQL_HOMEPAGE_SLIDER_PRODUCTS);

  console.log(sliderCollection.loading, sliderCollection.data);

  const [mappedProducts, isLoadingCollection] = useProducts([
    { name: "collectionName", value: "frontpage" },
    { name: "productsAmount", value: 50 }
  ]);

  return (
    <div>
      <Device mobile>
        <Container
          css={css`
            ${rslin(theme.spacings.s80, theme.spacings.s100).css(
              "margin-bottom"
            )}

            ${rslin(theme.spacings.s100, theme.spacings.s100).css("margin-top")}
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <div
              css={css`
                ${theme.fonts.h4.css}
                margin-bottom: 32px;
              `}
            >
              Basic&nbsp;Store
            </div>

            <StatefulInput
              placeholder={"What you're looking for?"}
              onFocus={() => {
                routerPush("/search");
              }}
              search
            />
          </div>
        </Container>
      </Device>

      <div
        css={css`
          & > div:not(:first-of-type) {
            ${rslin(theme.spacings.s120, theme.spacings.s160).css("margin-top")}
          }
        `}
      >
        <Container>
          <Banner
            image={data.images.boxes.full_box_01}
            imageMobile={data.images.boxes.mobile_box_01}
            href={"/collection"}
            label={"Truly Transparent"}
            title={"Transparent Bottle"}
          />
        </Container>

        <ProductSlider
          products={data.products.slice(0, 12)}
          title={"Top Picks"}
        />

        <TwoBanners
          title={"Trending Now"}
          banners={[
            <Banner
              image={data.images.boxes.half_box_10}
              imageMobile={data.images.boxes.mobile_box_10}
              label={"The Tonal Trend"}
              href={"/collection"}
            />,
            <Banner
              image={data.images.boxes.half_box_04}
              imageMobile={data.images.boxes.mobile_box_04}
              label={"Summer Must-Haves: Air Max Dia"}
              href={"/collection"}
            />
          ]}
        />

        <div>
          <Container>
            <SectionTitle>Top Categories</SectionTitle>
            <Grid gutterVertical={L.gutter}>
              {categories.map((category, index) => (
                <GridItem key={index} params={{ xs: 24, sm: 12, lg: 6 }}>
                  <CategoryCard
                    image={category.image}
                    text={category.title}
                    href={category.href}
                  />
                </GridItem>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

Home.tabbar = 0;
Home.showFooterOnMobile = true;

export default Home;
