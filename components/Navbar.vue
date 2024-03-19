<template>
  <header>
    <div class="Navbar">
      <div class="Navbar--Logo">
        <img :src="pageContent.logo.src" alt="Logo" />
      </div>
      <nav class="Navbar--Center">
        <template v-for="nav in pageContent.menuItems" :key="nav.name">
          <div
            v-if="nav.desktop"
            @mouseover="toggleMenu(nav)"
            :class="{ active: selectedMenuItem?.name === nav.name }"
          >
            {{ nav.title }}
            <svg
              v-if="nav.features"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1.10217L6 5.89777L1 1.10217"
                stroke="#252525"
                stroke-miterlimit="10"
              />
            </svg>
          </div>
        </template>
      </nav>
      <div class="Navbar--Right">
        <template v-for="action in pageContent.actionItems" :key="action.name">
          <template v-if="action.desktop">
            <button v-if="action.type === 'button'">
              {{ action.title }}
            </button>
            <div v-else>{{ action.title }}</div>
          </template>
        </template>
      </div>

      <!-- mobile menu -->
      <div class="Navbar--Mobile" @click="toggleMenu()">
        <svg
          v-if="!showMenu"
          width="24"
          height="19"
          viewBox="0 0 24 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.26416" width="24" height="2" fill="#252525" />
          <rect y="8.26416" width="24" height="2" fill="#252525" />
          <rect y="16.2642" width="24" height="2" fill="#252525" />
        </svg>
        <svg
          v-else
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.807617"
            y="17.0424"
            width="24"
            height="2"
            transform="rotate(-45 0.807617 17.0424)"
            fill="#252525"
          />
          <rect
            x="2.22186"
            y="0.0717773"
            width="24"
            height="2"
            transform="rotate(45 2.22186 0.0717773)"
            fill="#252525"
          />
        </svg>
      </div>

      <div v-if="showMenu" class="MobileMenu">
        <nav class="MobileMenu--Nav">
          <template v-for="item in pageContent.menuItems" :key="item.name">
            <div
              v-if="item.mobile"
              @click="setSelectedMenuItemMobile(item)"
              class="MobileMenu--Nav--item"
              :class="{ active: selectedMenuItem?.name === item.name }"
            >
              {{ item.title }}
              <div
                class="MobileMenu--Nav--panel"
                v-if="selectedMenuItem?.name === item.name"
              >
                <ul>
                  <li
                    :class="{ active: selectedFeature?.id === item.name }"
                    v-for="item in selectedMenuItem.features"
                    :key="item.name"
                    @click.stop="setSelectedFeature(item.name)"
                  >
                    <h4>{{ item.title }}</h4>
                    <div
                      v-if="selectedFeature?.id === item.name"
                      class="DesktopMenu--Content--info"
                    >
                      <h5>{{ selectedFeature?.title }}</h5>
                      <p>{{ selectedFeature?.content }}</p>
                      <div
                        v-if="selectedFeature?.links"
                        class="DesktopMenu--Content--info--links"
                      >
                        <NuxtLink
                          class="link-item"
                          to="#"
                          v-for="link in selectedFeature?.links"
                          :key="link.id"
                        >
                          <img :src="link.icon" />
                          <span>
                            {{ link.text }}
                            <span>
                              <svg
                                width="10"
                                height="11"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.84822 1.27623C8.92513 1.36268 8.96825 1.47993 8.96825 1.60219V7.68684C8.96825 7.94145 8.78477 8.14786 8.55852 8.14786C8.3322 8.14786 8.14873 7.94145 8.14873 7.68684V2.7151L1.50799 10.1859C1.34796 10.366 1.08852 10.366 0.92849 10.1859C0.768465 10.0059 0.768465 9.71399 0.92849 9.534L7.56926 2.06317H3.14989C2.92358 2.06317 2.74012 1.85679 2.74012 1.60219C2.74012 1.3476 2.92358 1.1412 3.14989 1.1412H8.55852C8.66715 1.1412 8.77139 1.18978 8.84822 1.27623Z"
                                  fill="black"
                                  stroke="black"
                                  stroke-width="0.5"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                          </span>
                        </NuxtLink>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </nav>
        <div class="MobileMenu--Actions">
          <template
            v-for="action in pageContent.actionItems"
            :key="action.name"
          >
            <template v-if="action.mobile">
              <button v-if="action.type === 'button'">
                {{ action.title }}
              </button>
              <div v-else>{{ action.title }}</div>
            </template>
          </template>
        </div>
      </div>

      <div v-if="showMenu && selectedMenuItem?.features" class="DesktopMenu">
        <div class="DesktopMenu--features">
          <ul>
            <li
              :class="{ active: selectedFeature?.id === item.name }"
              v-for="item in selectedMenuItem.features"
              :key="item.name"
              @mouseover="setSelectedFeature(item.name)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div class="DesktopMenu--Content">
          <div class="DesktopMenu--Content--info">
            <h2>{{ selectedFeature?.title }}</h2>
            <p>{{ selectedFeature?.content }}</p>
            <div
              v-if="selectedFeature?.links"
              class="DesktopMenu--Content--info--links"
            >
              <NuxtLink
                class="link-item"
                to="#"
                v-for="link in selectedFeature?.links"
                :key="link.id"
              >
                <img :src="link.icon" />
                <span>
                  {{ link.text }}
                  <span>
                    <svg
                      width="10"
                      height="11"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.84822 1.27623C8.92513 1.36268 8.96825 1.47993 8.96825 1.60219V7.68684C8.96825 7.94145 8.78477 8.14786 8.55852 8.14786C8.3322 8.14786 8.14873 7.94145 8.14873 7.68684V2.7151L1.50799 10.1859C1.34796 10.366 1.08852 10.366 0.92849 10.1859C0.768465 10.0059 0.768465 9.71399 0.92849 9.534L7.56926 2.06317H3.14989C2.92358 2.06317 2.74012 1.85679 2.74012 1.60219C2.74012 1.3476 2.92358 1.1412 3.14989 1.1412H8.55852C8.66715 1.1412 8.77139 1.18978 8.84822 1.27623Z"
                        fill="black"
                        stroke="black"
                        stroke-width="0.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </NuxtLink>
            </div>
          </div>
          <div class="DesktopMenu--Content--capabilities">
            <span>Platform Capabilities</span>
            <ul>
              <li
                v-for="capability in selectedFeature?.capabilities"
                :key="capability"
              >
                {{ capability }}
              </li>
            </ul>
          </div>
          <div class="DesktopMenu--Content--image">
            <img
              :src="selectedFeature?.image.src"
              :alt="selectedFeature?.image.text"
            />
            <div>{{ selectedFeature?.image.text }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of Navbar -->
  </header>
</template>

<script setup lang="ts">
const pageContent = reactive({
  logo: {
    text: 'guest',
    badge: 'XM',
    src: 'images/NavLogo.png',
  },
  menuItems: [
    {
      name: 'menuItem1',
      title: 'Platform',
      icon: true,
      features: [
        { name: 'submenu1', title: 'Feedback & Sentiment Analysis' },
        { name: 'submenu2', title: 'Brand Reputation Management' },
        { name: 'submenu3', title: 'Market Intelligence' },
        { name: 'submenu4', title: 'Hospitality AI' },
      ],
      desktop: true,
      mobile: true,
    },
    { name: 'menuItem2', title: 'Resources', desktop: true, mobile: true },
    { name: 'menuItem3', title: 'About Us', desktop: true, mobile: true },
    { name: 'menuItem4', title: 'Login', desktop: false, mobile: true },
  ],
  actionItems: [
    { name: 'actionItem1', title: 'Login', desktop: true, mobile: false },
    {
      name: 'actionItem2',
      title: 'Book a Demo',
      type: 'button',
      desktop: true,
      mobile: true,
    },
  ],
  content: {
    submenu1: {
      id: 'submenu1',
      title: 'The Complete Restaurant Experience Monitoring Solution',
      content:
        'Review all Guest experience feedback across all social, review, and survey channels including in-store or off- premises channels.',
      links: [
        { id: 1, icon: 'icons/survey.png', text: 'Survey' },
        { id: 2, icon: 'icons/social.png', text: 'Social Listening' },
      ],
      capabilities: [
        'Survey & Form Management',
        'Delivery Service Satisfaction',
        'Net-Promoted Score (NPS)',
        'Customer Satisfaction (CSAT)',
        'Customer Effort (CES)',
        'Customer Sentiment',
        'Natural Language Processing',
        'Social & Review Site Coverage',
      ],
      image: {
        src: 'images/article1.png',
        text: 'Restaurant Sales Growth Weakest Since Last Summer as Guest Check Growth Falls',
      },
    },
    submenu2: {
      id: 'submenu2',
      title: 'Reputation Management for Restaruant Chains',
      content: 'Monitor, respond to, and promote your guest word-of-mouth',
      links: [
        {
          id: 3,
          icon: 'icons/review-management.png',
          text: 'Review Management',
        },
      ],
      capabilities: [
        'Unified Review Inbox',
        'Real-Time Alerts',
        'Response Templates',
        'Review Promotions',
      ],
      image: {
        src: 'images/article1.png',
        text: 'Restaurant Sales Growth Weakest Since Last Summer as Guest Check Growth Falls',
      },
    },
    submenu3: {
      id: 'submenu3',
      title: 'Restaurant Industry Benchmark Insights',
      content: 'Benchmark performance to local, regional, and national peers',
      links: [
        {
          id: 4,
          icon: 'icons/staffing.png',
          text: 'Staffing & Compensation Benchmarks',
        },
        { id: 5, icon: 'icons/sales.png', text: 'Sales & Traffic Benchmarks' },
      ],
      capabilities: [
        'Local Hiring',
        'Team Training',
        'Turnover Insights',
        'Staff Productivity',
        'Customer Trends',
        'New Market Entrants',
        'Guest Behavior',
        'Competitor Insights',
      ],
      image: {
        src: 'images/article1.png',
        text: 'Restaurant Sales Growth Weakest Since Last Summer as Guest Check Growth Falls',
      },
    },
    submenu4: {
      id: 'submenu4',
      title: 'Data-driven insights to grow sales',
      content:
        'Instantly spot areas of improvement and exceed guests’ expectations for both new and returning customers.',
      links: [
        { id: 6, icon: 'icons/insights.png', text: 'Actionable Insights' },
      ],
      capabilities: [
        'Survey & Form Management',
        'Delivery Service Satisfaction',
        'Net-Promoted Score (NPS)',
        'Customer Satisfaction (CSAT)',
        'Customer Effort (CES)',
        'Customer Sentiment',
        'Natural Language Processing',
        'Social & Review Site Coverage',
      ],
      image: {
        src: 'images/article1.png',
        text: 'Restaurant Sales Growth Weakest Since Last Summer as Guest Check Growth Falls',
      },
    },
  },
});

const showMenu = ref(false);
const selectedMenuItem = ref(null);
const selectedFeature = ref(null);

function toggleMenu(menuItem) {
  showMenu.value = !showMenu.value;

  selectedMenuItem.value = showMenu.value && menuItem ? menuItem : null;
  selectedFeature.value =
    showMenu.value && menuItem
      ? pageContent.content[menuItem.features[0].name]
      : null;
}

function setSelectedMenuItemMobile(menuItem) {
  selectedMenuItem.value = menuItem;
  setSelectedFeature(menuItem.features?.[0].name);
}

function setSelectedFeature(key) {
  selectedFeature.value = pageContent.content[key];
}
</script>

<style lang="scss" scoped>
header {
  font-family: $font-medium;
  font-size: 18px;
  letter-spacing: 0.02em;
  position: relative;
  height: 101px;
  background-color: $color-white;

  .Navbar {
    padding: 32px 39px 29px 27px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--Logo {
      margin-top: 5px;
      margin-left: 15px;
      position: relative;
      display: flex;
      align-items: center;
      width: 146px;
      min-width: 146px;
      height: 34px;
    }

    &--Center {
      display: flex;
      flex-direction: row;
      gap: 42px;
      flex-shrink: 0;
      margin-top: 20px;
      margin-bottom: 7px;

      svg {
        pointer-events: none;
        margin-left: 12px;
        path {
          stroke: currentcolor;
        }
      }

      div {
        cursor: pointer;

        &.active,
        &:hover {
          color: $color-purple;
        }
      }
    }

    &--Right {
      display: flex;
      flex-direction: row;
      gap: 32px;
      align-items: center;
      margin: 9px 2px -4px 0;
    }

    button {
      font-family: $font-medium;
      background-color: $color-purple;
      color: $color-white;
      width: 188px;
      height: 34px;
      border-radius: 40px;
      border: none;

      &:hover {
        background-color: lighten($color-purple, 10%);
      }
    }

    &--Mobile {
      cursor: pointer;
      display: none;
    }

    .DesktopMenu {
      display: flex;
      position: absolute;
      height: calc(100vh - 101px);
      width: 100vw;
      top: 101px;
      left: 0;
      overflow-x: auto;

      &--features {
        color: $color-white;
        background-color: $color-teal;
        min-width: 482px;

        ul {
          margin: 86px 67px;

          li {
            list-style: none;
            position: relative;
            cursor: pointer;
            margin-bottom: 37px;

            &:hover {
              filter: brightness(65%);
            }

            &:hover:before,
            &.active:before {
              content: ' ';
              width: 14px;
              height: 14px;
              border-style: solid;
              border-width: 10px 0px 10px 15px;
              border-color: transparent transparent transparent currentColor;
              position: absolute;
              left: -27px;
              transform: scale(0.7);
            }
          }
        }
      }

      &--Content {
        font-family: $font-regular;
        color: $color-text;
        background-color: $color-background;
        display: flex;
        padding: 85px 43px 67px 17px;

        &--info {
          display: flex;
          flex-direction: column;
          gap: 17px;
          min-width: 423px;
          line-height: 30px;
          margin-right: 40px;

          p {
            font-size: 14px;
            margin-bottom: 19px;
          }

          &--links > .link-item {
            &:hover {
              color: $color-purple;
              font-size: 22px;
              transition-duration: 0.2s;
            }

            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            font-size: 18px;
            color: $color-text;
            text-decoration: none;

            img {
              width: 28px;
              height: 29px;
            }

            svg {
              margin-left: 12px;
              path {
                stroke: currentcolor;
              }
            }
          }
        }

        &--capabilities {
          min-width: 197px;
          padding: 0 18px;
          border-left: 1px solid $color-separator2;
          border-right: 1px solid $color-separator2;
          font-size: 12px;

          span {
            text-transform: uppercase;
            font-weight: bold;
          }

          ul {
            margin-top: 18px;
            list-style: none;
            line-height: 15px;

            li {
              margin-bottom: 7px;
              cursor: pointer;
              transition-duration: 0.2s;

              &:hover {
                animation-duration: 4s;
                font-size: 14px;
                font-weight: bold;
                color: $color-purple;
              }
            }
          }
        }

        &--image {
          min-width: 271px;
          padding: 0 18px;
          font-size: 11px;
          font-weight: bold;
          line-height: 15px;

          img {
            min-width: 210px;
            width: 100%;
            height: auto;
          }
        }
      }
    }

    .MobileMenu {
      display: none;
      color: $color-white;
      position: absolute;
      height: calc(100vh - 101px);
      width: 100vw;
      background-color: $color-teal;
      top: 101px;
      left: 0;
      flex-direction: column;
      justify-content: space-between;

      &--Nav {
        max-height: calc(100vh - 101px);

        &--item {
          border-bottom: 1px solid $color-separator;
          padding: 23px 17px;

          &.active {
            background-color: $color-background;
            color: $color-text;
            max-height: 500px;
            overflow-y: auto;
          }
        }

        &--panel {
          background-color: $color-background;
          font-family: $font-regular;

          ul {
            list-style: none;
            padding: 0 17px;

            li {
              padding: 18px 0;
              border-bottom: 1px solid $color-separator2;
              &.active {
                list-style: disclosure-closed;
                &::marker {
                  color: $color-purple;
                }
              }
              &:last-of-type {
                padding-bottom: 0;
                border: unset;
              }

              .active {
              }
            }
          }
        }
      }

      &--Actions {
        position: absolute;
        bottom: 26px;
        left: 17px;
      }
    }

    // responsive
    //------------

    // mobile
    @media screen and (max-width: 600px) {
      padding: 31px 18px 36px 18px;

      &--Logo {
        margin: 0;
      }

      &--Center {
        display: none;
      }
      &--Right {
        display: none;
      }

      &--Mobile {
        display: block;
        margin: 8px 0px;
        padding-top: 6px;
      }

      .MobileMenu {
        display: flex;
      }

      .DesktopMenu {
        display: none;

        &--Content {
          &--info {
            gap: 0;
            margin-top: 20px;
            min-width: unset;
            line-height: 20px;
            p {
            }
            &--links > .link-item {
              font-size: 15px;
              font-weight: bold;

              &:last-of-type {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }

    @media screen and (min-width: 600px) {
      .DesktopMenu {
        &--features {
          min-width: 240px;
        }

        &--Content {
          flex-direction: column;
          flex-wrap: 1;

          &--capabilities {
            margin-top: 10px;
            padding: 0;
            border-left: none;
            border-right: none;
          }

          &--image {
            display: none;
          }
        }
      }
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
      .DesktopMenu {
        &--features {
          min-width: 360px;
        }

        &--Content {
          flex-direction: row;

          &--capabilities {
            text-align: center;
            border-left: 1px solid $color-separator2;
            border-right: 1px solid $color-separator2;
          }

          &--image {
            display: none;
          }
        }
      }
    }
    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
      .DesktopMenu {
        &--features {
          min-width: 360px;
        }

        &--Content {
          flex-direction: row;

          &--capabilities {
            text-align: center;

            ul {
            }
          }

          &--image {
            display: block;
          }
        }
      }
    }
  }
}
</style>
