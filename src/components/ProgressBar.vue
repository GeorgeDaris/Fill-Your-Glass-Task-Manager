<script setup>
// import { ref, computed } from "vue";
defineProps(["total", "glass"]);
</script>

<template>
  <!-- <div class="flex m-1 mb-2 mt-0">
    <progress
      :max="total.length"
      :value="total.filter((item) => item.completed).length"
      class="glass bg-lightGrey h-2 rounded-full dark:bg-lightDark"
    ></progress>
  </div> -->
  <div v-if="glass" class="flex items-center justify-center m-1 mb-2 mt-0">
    <div
      role="progressbar"
      :aria-valuemax="total.length"
      :aria-valuenow="total.filter((item) => item.completed).length"
      class="glass-of-waves flex overflow-hidden bg-lightGreyNOT bg-gradient-to-bl from-bgColor to-accentLight via-lightGrey h-80 w-80 rounded-full rNOTounded-t-lg relative dark:bg-lightDarkNOT dark:bg-gradient-to-tr dark:from-[#101217] dark:to-lightDark dark:via-darkBg"
    >
      <!-- <div
        class="bg-accentColor glass-wave w-40 rounded-lg rounded-t-none transition-all duration-300"
        :style="{
          height:
            (total.filter((item) => item.completed).length / total.length) *
              100 +
            '%',
        }"
      >
        
      </div> -->
      <!-- <svg
        :style="{
          height:
            (total.filter((item) => item.completed).length / total.length) *
              100 +
            '%',
        }"
        class="absolute bottom-0 transition-all duration-700"
        preserveAspectRatio="none"
        id="visual"
        viewBox="0 0 675 900"
        width="675"
        height="427"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <path
          d="M0 585L28.2 584.3C56.3 583.7 112.7 582.3 169 574.8C225.3 567.3 281.7 553.7 337.8 541.2C394 528.7 450 517.3 506.2 525.5C562.3 533.7 618.7 561.3 646.8 575.2L675 589L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#578cda"
        />
        <path
          d="M0 563L28.2 554.2C56.3 545.3 112.7 527.7 169 531.7C225.3 535.7 281.7 561.3 337.8 574.7C394 588 450 589 506.2 577.8C562.3 566.7 618.7 543.3 646.8 531.7L675 520L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#4080c3"
        />
        <path
          d="M0 607L28.2 599.2C56.3 591.3 112.7 575.7 169 571.5C225.3 567.3 281.7 574.7 337.8 579.8C394 585 450 588 506.2 601.3C562.3 614.7 618.7 638.3 646.8 650.2L675 662L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#2e74ab"
        />
        <path
          d="M0 701L28.2 693.7C56.3 686.3 112.7 671.7 169 664.5C225.3 657.3 281.7 657.7 337.8 657.2C394 656.7 450 655.3 506.2 647.8C562.3 640.3 618.7 626.7 646.8 619.8L675 613L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#206794"
        />
        <path
          d="M0 668L28.2 669C56.3 670 112.7 672 169 682.2C225.3 692.3 281.7 710.7 337.8 713.3C394 716 450 703 506.2 703.8C562.3 704.7 618.7 719.3 646.8 726.7L675 734L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#195a7d"
        />
        <path
          d="M0 776L28.2 769.3C56.3 762.7 112.7 749.3 169 740.7C225.3 732 281.7 728 337.8 732.3C394 736.7 450 749.3 506.2 755C562.3 760.7 618.7 759.3 646.8 758.7L675 758L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#184d66"
        />
        <path
          d="M0 816L28.2 811.3C56.3 806.7 112.7 797.3 169 798.2C225.3 799 281.7 810 337.8 806.3C394 802.7 450 784.3 506.2 783.3C562.3 782.3 618.7 798.7 646.8 806.8L675 815L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#184051"
        />
        <path
          d="M0 837L28.2 834.3C56.3 831.7 112.7 826.3 169 826.2C225.3 826 281.7 831 337.8 833.7C394 836.3 450 836.7 506.2 838C562.3 839.3 618.7 841.7 646.8 842.8L675 844L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#19333d"
        />
      </svg> -->
      <svg
        :style="{
          height:
            (total.filter((item) => item.completed).length / total.length) *
              100 +
            '%',
        }"
        class="waves absolute bottom-0 w-[40rem] min-NOTw-full animate-waves transition-all duration-700"
        preserveAspectRatio="none"
        id="visual"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 520 675 381"
        wNOidth="170"
      >
        <path
          d="M0 585L28.2 584.3C56.3 583.7 112.7 582.3 169 574.8C225.3 567.3 281.7 553.7 337.8 541.2C394 528.7 450 517.3 506.2 525.5C562.3 533.7 618.7 561.3 646.8 575.2L675 589L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#578cda"
        ></path>
        <path
          d="M0 563L28.2 554.2C56.3 545.3 112.7 527.7 169 531.7C225.3 535.7 281.7 561.3 337.8 574.7C394 588 450 589 506.2 577.8C562.3 566.7 618.7 543.3 646.8 531.7L675 520L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#4080c3"
        ></path>
        <path
          d="M0 607L28.2 599.2C56.3 591.3 112.7 575.7 169 571.5C225.3 567.3 281.7 574.7 337.8 579.8C394 585 450 588 506.2 601.3C562.3 614.7 618.7 638.3 646.8 650.2L675 662L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#2e74ab"
        ></path>
        <path
          d="M0 701L28.2 693.7C56.3 686.3 112.7 671.7 169 664.5C225.3 657.3 281.7 657.7 337.8 657.2C394 656.7 450 655.3 506.2 647.8C562.3 640.3 618.7 626.7 646.8 619.8L675 613L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#206794"
        ></path>
        <path
          d="M0 668L28.2 669C56.3 670 112.7 672 169 682.2C225.3 692.3 281.7 710.7 337.8 713.3C394 716 450 703 506.2 703.8C562.3 704.7 618.7 719.3 646.8 726.7L675 734L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#195a7d"
        ></path>
        <path
          d="M0 776L28.2 769.3C56.3 762.7 112.7 749.3 169 740.7C225.3 732 281.7 728 337.8 732.3C394 736.7 450 749.3 506.2 755C562.3 760.7 618.7 759.3 646.8 758.7L675 758L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#184d66"
        ></path>
        <path
          d="M0 816L28.2 811.3C56.3 806.7 112.7 797.3 169 798.2C225.3 799 281.7 810 337.8 806.3C394 802.7 450 784.3 506.2 783.3C562.3 782.3 618.7 798.7 646.8 806.8L675 815L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#184051"
        ></path>
        <path
          d="M0 837L28.2 834.3C56.3 831.7 112.7 826.3 169 826.2C225.3 826 281.7 831 337.8 833.7C394 836.3 450 836.7 506.2 838C562.3 839.3 618.7 841.7 646.8 842.8L675 844L675 901L646.8 901C618.7 901 562.3 901 506.2 901C450 901 394 901 337.8 901C281.7 901 225.3 901 169 901C112.7 901 56.3 901 28.2 901L0 901Z"
          fill="#19333d"
        ></path>
      </svg>
      <div
        class="absolute w-full h-full bg-gradient-to-bl from-bgColor to-accentLight via-lightGrey dark:bg-gradient-to-tr dark:from-[#101217] dark:to-lightDark dark:via-darkBg opacity-25NOT mix-blend-overlay opacity-30"
      ></div>
    </div>
  </div>
  <div v-else class="flex m-1 mb-2 mt-0">
    <div
      role="progressbar"
      :aria-valuemax="total.length"
      :aria-valuenow="total.filter((item) => item.completed).length"
      class="bg-lightGrey h-2 w-40 rounded-full dark:bg-lightDark"
    >
      <div
        class="bg-accentColor h-2 rounded-full transition-all duration-300"
        :style="{
          width:
            (total.filter((item) => item.completed).length / total.length) *
              100 +
            '%',
        }"
      >
        <!-- <svg
          width="167"
          height="10"
          viewBox="0 0 167 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M78.8475 1C83.6906 3.98932 78.8475 6.85053 78.8475 6.85053C78.8475 6.85053 72.4406 9.71174 78.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M73.8475 1C78.6906 3.98932 73.8475 6.85053 73.8475 6.85053C73.8475 6.85053 67.4406 9.71174 73.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M68.8475 1C73.6906 3.98932 68.8475 6.85053 68.8475 6.85053C68.8475 6.85053 62.4406 9.71174 68.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M63.8475 1C68.6906 3.98932 63.8475 6.85053 63.8475 6.85053C63.8475 6.85053 57.4406 9.71174 63.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M58.8475 1C63.6906 3.98932 58.8475 6.85053 58.8475 6.85053C58.8475 6.85053 52.4406 9.71174 58.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M44.8475 1C49.6906 3.98932 44.8475 6.85053 44.8475 6.85053C44.8475 6.85053 38.4406 9.71174 44.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M39.8475 1C44.6906 3.98932 39.8475 6.85053 39.8475 6.85053C39.8475 6.85053 33.4406 9.71174 39.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M34.8475 1C39.6906 3.98932 34.8475 6.85053 34.8475 6.85053C34.8475 6.85053 28.4406 9.71174 34.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M18.8475 1C23.6906 3.98932 18.8475 6.85053 18.8475 6.85053C18.8475 6.85053 12.4406 9.71174 18.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M13.8475 1C18.6906 3.98932 13.8475 6.85053 13.8475 6.85053C13.8475 6.85053 7.44058 9.71174 13.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M8.84754 1C13.6906 3.98932 8.84754 6.85053 8.84754 6.85053C8.84754 6.85053 2.44058 9.71174 8.84754 13"
            stroke="#1D212A"
          />
          <path
            d="M3.84754 1C8.69058 3.98932 3.84754 6.85053 3.84754 6.85053C3.84754 6.85053 -2.55942 9.71174 3.84754 13"
            stroke="#1D212A"
          />
          <path
            d="M163.848 1C168.691 3.98932 163.848 6.85053 163.848 6.85053C163.848 6.85053 157.441 9.71174 163.848 13"
            stroke="#1D212A"
          />
          <path
            d="M158.848 1C163.691 3.98932 158.848 6.85053 158.848 6.85053C158.848 6.85053 152.441 9.71174 158.848 13"
            stroke="#1D212A"
          />
          <path
            d="M153.848 1C158.691 3.98932 153.848 6.85053 153.848 6.85053C153.848 6.85053 147.441 9.71174 153.848 13"
            stroke="#1D212A"
          />
          <path
            d="M148.848 1C153.691 3.98932 148.848 6.85053 148.848 6.85053C148.848 6.85053 142.441 9.71174 148.848 13"
            stroke="#1D212A"
          />
          <path
            d="M143.848 1C148.691 3.98932 143.848 6.85053 143.848 6.85053C143.848 6.85053 137.441 9.71174 143.848 13"
            stroke="#1D212A"
          />
          <path
            d="M129.848 1C134.691 3.98932 129.848 6.85053 129.848 6.85053C129.848 6.85053 123.441 9.71174 129.848 13"
            stroke="#1D212A"
          />
          <path
            d="M124.848 1C129.691 3.98932 124.848 6.85053 124.848 6.85053C124.848 6.85053 118.441 9.71174 124.848 13"
            stroke="#1D212A"
          />
          <path
            d="M119.848 1C124.691 3.98932 119.848 6.85053 119.848 6.85053C119.848 6.85053 113.441 9.71174 119.848 13"
            stroke="#1D212A"
          />
          <path
            d="M103.848 1C108.691 3.98932 103.848 6.85053 103.848 6.85053C103.848 6.85053 97.4406 9.71174 103.848 13"
            stroke="#1D212A"
          />
          <path
            d="M98.8475 1C103.691 3.98932 98.8475 6.85053 98.8475 6.85053C98.8475 6.85053 92.4406 9.71174 98.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M93.8475 1C98.6906 3.98932 93.8475 6.85053 93.8475 6.85053C93.8475 6.85053 87.4406 9.71174 93.8475 13"
            stroke="#1D212A"
          />
          <path
            d="M88.8475 1C93.6906 3.98932 88.8475 6.85053 88.8475 6.85053C88.8475 6.85053 82.4406 9.71174 88.8475 13"
            stroke="#1D212A"
          />
        </svg> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .waves {
  mask: url("data:image/png;base64,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");
} */

/* .glass-of-waves::after {
  content: "";
  position: absolute;
  top: 0;
  background-color: red;
  width: 100%;
  height: 4rem;
} */

/* .glass-wave {
  --mask: radial-gradient(54.72px at 50% 75.4px, #000 99%, #0000 101%)
      calc(50% - 58px) 0/116px 100%,
    radial-gradient(54.72px at 50% -46.4px, #0000 99%, #000 101%) 50% 29px/116px
      100% repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
  position: relative;
} */

/*.glass {
    transform: rotate(-90deg);
    height: 15rem;
    width: 15rem;
  }
  .glass::after {
    content: "pretend this is a glass of water";
  }*/
</style>
